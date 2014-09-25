package com.wiki.module;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;

/**
 * Created with IntelliJ IDEA.
 * User: WongJohn
 * Date: 14-6-9
 * Time: 下午4:37
 * To change this template use File | Settings | File Templates.
 */
public class WikiContextListener extends GuiceServletContextListener {
    public WikiContextListener(){
    }

    @Override
    protected Injector getInjector() {
        WikiResourceModule module = new WikiResourceModule();
        return Guice.createInjector(module);
    }
}
