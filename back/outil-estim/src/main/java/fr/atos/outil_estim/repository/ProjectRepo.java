package fr.atos.outil_estim.repository;

import fr.atos.outil_estim.entities.Project;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepo extends JpaRepository<Project, Long> {
}
