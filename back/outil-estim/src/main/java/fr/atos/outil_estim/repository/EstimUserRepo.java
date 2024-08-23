package fr.atos.outil_estim.repository;

import fr.atos.outil_estim.entities.EstimUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface EstimUserRepo extends JpaRepository<EstimUser, Long> {

}
