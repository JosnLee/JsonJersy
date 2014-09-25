package com.wiki.module;

import com.google.inject.Singleton;
import com.google.inject.persist.PersistFilter;
import com.google.inject.persist.jpa.JpaPersistModule;
import com.sun.jersey.guice.JerseyServletModule;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * WikiResourceModule
 */
public class WikiResourceModule extends JerseyServletModule {
    @Override
    protected void configureServlets() {
        bind(GuiceContainer.class);

        bind(WikiCorsFilter.class).in(Singleton.class);
        filter("/api/*").through(WikiCorsFilter.class);

        Map<String, String> params = new HashMap<String, String>();
//        params.put("jersey.config.server.provider.packages", "com.wiki.services");//Jersey 2.0
        params.put("com.sun.jersey.config.property.packages", "com.wiki.services"); //PROPERTY_PACKAGES
        params.put("com.sun.jersey.api.json.POJOMappingFeature", "true");

        serve("/api/*").with(GuiceContainer.class, params);
        install(new JpaPersistModule("domain"));
//        install(new JpaPersistModule("domain").properties(mySqlProperties()));
        filter("/api/*").through(PersistFilter.class);
    }

    public Properties oracleProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.connection.driver_class", "oracle.jdbc.driver.OracleDriver");
        properties.put("hibernate.connection.url", "jdbc:oracle:thin:@127.0.0.1:1521:orcl");
        properties.put("hibernate.connection.username", "herendh");
        properties.put("hibernate.connection.password", "herendh");
        properties.put("hibernate.dialect", "org.hibernate.dialect.Oracle10gDialect");
//        properties.put("hibernate.hbm2ddl.auto", "create");
        properties.put("hibernate.hbm2ddl.auto", "create-drop");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.format_sql", "true");

        return properties;
    }

    public Properties mySqlProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.connection.driver_class", "com.mysql.jdbc.Driver");
        properties.put("hibernate.connection.url", "jdbc:mysql://localhost:3306/orcl?useUnicode=true&amp;characterEncoding=UTF-8");
        properties.put("hibernate.connection.username", "root");
        properties.put("hibernate.connection.password", "herendh");
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        properties.put("hibernate.hbm2ddl.auto", "create");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.format_sql", "true");

        return properties;
    }
}
