package fr.atos.outil_estim.repository;

import fr.atos.outil_estim.entities.Tag;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepo extends JpaRepository<Tag, Long> {
	Optional<Tag> findByName(String name);
}
