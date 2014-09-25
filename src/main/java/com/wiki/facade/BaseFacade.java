package com.wiki.facade;


import javax.inject.Inject;
import javax.persistence.EntityManager;

/**
 * BaseFacade.
 */
public class BaseFacade {
    @Inject
    protected EntityManager entityManager;


}
