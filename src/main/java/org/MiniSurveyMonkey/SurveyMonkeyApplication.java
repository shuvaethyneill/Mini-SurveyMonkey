package org.MiniSurveyMonkey;

import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Fields.FieldType;
import org.MiniSurveyMonkey.Fields.TextField;
import org.MiniSurveyMonkey.Repositories.FieldRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;





@SpringBootApplication
public class SurveyMonkeyApplication {
    @Autowired
    private FieldRepo repository;
    public static void main(String[] args) {
        SpringApplication.run(SurveyMonkeyApplication.class, args);

    }

    public void run(String... args) throws Exception {

        repository.deleteAll();

        // save a couple of customers
        repository.save(new TextField("Who is it", "andre"));

        // fetch all customers
        System.out.println("Customers found with findAll():");
        System.out.println("-------------------------------");
        for (Field f : repository.findAll()) {
            System.out.println(f);
        }
        System.out.println();

        // fetch an individual customer
        System.out.println("Customer found with findByFirstName('Alice'):");
        System.out.println("--------------------------------");
        System.out.println(repository.findByFieldType(FieldType.TEXT));




    }
}