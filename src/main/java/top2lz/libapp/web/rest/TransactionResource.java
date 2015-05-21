package top2lz.libapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import top2lz.libapp.domain.Transaction;
import top2lz.libapp.domain.User;
import top2lz.libapp.repository.TransactionRepository;
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

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Transaction.
 */
@RestController
@RequestMapping("/api")
public class TransactionResource {

    private final Logger log = LoggerFactory.getLogger(TransactionResource.class);

    @Inject
    private TransactionRepository transactionRepository;

    @Inject
    private UserService userService;

    /**
     * POST  /transactions -> Create a new transaction.
     */
    @RequestMapping(value = "/transactions",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> create(@RequestBody Transaction transaction) throws URISyntaxException {
        log.debug("REST request to save Transaction : {}", transaction);
        if (transaction.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new transaction cannot already have an ID").build();
        }
        User user = userService.getUserWithAuthorities();
        transaction.setUser(user);
        transactionRepository.save(transaction);
        return ResponseEntity.created(new URI("/api/transactions/" + transaction.getId())).build();
    }

    /**
     * PUT  /transactions -> Updates an existing transaction.
     */
    @RequestMapping(value = "/transactions",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> update(@RequestBody Transaction transaction) throws URISyntaxException {
        log.debug("REST request to update Transaction : {}", transaction);
        if (transaction.getId() == null) {
            return create(transaction);
        }
        transactionRepository.save(transaction);
        return ResponseEntity.ok().build();
    }

    /**
     * GET  /transactions -> get all the transactions.
     */
    @RequestMapping(value = "/transactions",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Transaction>> getAll(@RequestParam(value = "page" , required = false) Integer offset,
                                  @RequestParam(value = "per_page", required = false) Integer limit)
        throws URISyntaxException {
        Page<Transaction> page = transactionRepository.findAll(PaginationUtil.generatePageRequest(offset, limit));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transactions", offset, limit);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /transactions/:id -> get the "id" transaction.
     */
    @RequestMapping(value = "/transactions/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Transaction> get(@PathVariable Long id) {
        log.debug("REST request to get Transaction : {}", id);
        return Optional.ofNullable(transactionRepository.findOne(id))
            .map(transaction -> new ResponseEntity<>(
                transaction,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /transactions/:id -> delete the "id" transaction.
     */
    @RequestMapping(value = "/transactions/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable Long id) {
        log.debug("REST request to delete Transaction : {}", id);
        transactionRepository.delete(id);
    }

    @RequestMapping(value = "/transactions/forCurrentUser",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Transaction>> getAllForCurrentUser() {
        List<Transaction> transactions = transactionRepository.findAllForCurrentUser();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
