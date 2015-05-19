package top2lz.libapp.repository;

import top2lz.libapp.domain.Transaction;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Transaction entity.
 */
public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    @Query("select transaction from Transaction transaction where transaction.user.login = ?#{principal.username}")
    List<Transaction> findAllForCurrentUser();

}
