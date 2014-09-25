package com.wiki;

import org.flywaydb.core.Flyway;

/**
 * Created by lee on 2014/9/25.
 */
public  class FlywayMerger {
    public static void flywayMerger(){
        // Create the Flyway instance
        Flyway flyway = new Flyway();

        // Point it to the database
        flyway.setDataSource("jdbc:mysql://127.0.0.1:3306/orcl", "root", "herendh");
        flyway.clean();


        // Start the db.db.migration
        flyway.migrate();
    }
}
