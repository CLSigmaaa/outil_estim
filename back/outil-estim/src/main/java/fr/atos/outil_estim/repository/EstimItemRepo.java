package fr.atos.outil_estim.repository;

import fr.atos.outil_estim.entities.EstimItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimItemRepo extends JpaRepository<EstimItem, Long> {
}
