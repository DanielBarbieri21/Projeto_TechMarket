package com.techmarket.repository;

import com.techmarket.entity.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    
    Optional<Transfer> findByIdempotencyKey(String idempotencyKey);
    
    @Query("SELECT t FROM Transfer t WHERE t.origemAccountId = :accountId OR t.destinoAccountId = :accountId ORDER BY t.timestamp DESC")
    List<Transfer> findByAccountId(@Param("accountId") Long accountId);
}
