package top2lz.libapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import top2lz.libapp.domain.Book;
import top2lz.libapp.domain.Transaction;
import top2lz.libapp.domain.User;
import top2lz.libapp.repository.BookRepository;
import top2lz.libapp.repository.TransactionRepository;
import top2lz.libapp.security.AuthoritiesConstants;
import top2lz.libapp.service.UserService;
import top2lz.libapp.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Book.
 */
@RestController
@RequestMapping("/api")
public class BookResource {

    private final Logger log = LoggerFactory.getLogger(BookResource.class);

    @Inject
    private BookRepository bookRepository;

    @Inject
    TransactionRepository transactionRepository;

    @Inject
    UserService userService;

    /**
     * POST  /transactions -> Create a new book.
     */
    @RequestMapping(value = "/books",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> create(@RequestBody Book book) throws URISyntaxException {
        log.debug("REST request to save Book : {}", book);
        if (book.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new book cannot already have an ID").build();
        }
        bookRepository.save(book);
        return ResponseEntity.created(new URI("/api/transactions/" + book.getId())).build();
    }

    /**
     * PUT  /transactions -> Updates an existing book.
     */
    @RolesAllowed(AuthoritiesConstants.ADMIN)
    @RequestMapping(value = "/books",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> update(@RequestBody Book book) throws URISyntaxException {
        log.debug("REST request to update Book : {}", book);
        if (book.getId() == null) {
            return create(book);
        }
        bookRepository.save(book);
        return ResponseEntity.ok().build();
    }

    /**
     * GET  /transactions -> get all the transactions.
     */
    @RequestMapping(value = "/books",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Book>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
                                  @RequestParam(value = "per_page", required = false) Integer limit)
        throws URISyntaxException {
        Page<Book> page = bookRepository.findAll(PaginationUtil.generatePageRequest(offset, limit));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transactions", offset, limit);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /transactions/:id -> get the "id" book.
     */
    @RequestMapping(value = "/books/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Book> get(@PathVariable Long id) {
        log.debug("REST request to get Book : {}", id);
        return Optional.ofNullable(bookRepository.findOne(id))
            .map(book -> new ResponseEntity<>(
                book,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /transactions/:id -> delete the "id" book.
     */
    @RolesAllowed(AuthoritiesConstants.ADMIN)
    @RequestMapping(value = "/books/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Book : {}", id);
        bookRepository.delete(id);
    }

    /**
     * Borrow /transactions/:id/borrow -> borrow a book by a user
     */
    @RequestMapping(value = "/books/{id}/borrow",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<String> borrow(@PathVariable Long id) {
        log.debug("REST request to borrow a Book");
        Transaction transaction = new Transaction();
        Book book = bookRepository.findOne(id);
        User user = userService.getUserWithAuthorities();
        transaction.setBook(book);
        transaction.setUser(user);

        transactionRepository.save(transaction);

        return new ResponseEntity<String>("Ok", HttpStatus.OK);
    }
}
