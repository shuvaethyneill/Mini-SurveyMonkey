package org.MiniSurveyMonkey;

import org.MiniSurveyMonkey.Fields.TextField;
import org.MiniSurveyMonkey.Repositories.FieldRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SurveyMonkeyApplication implements CommandLineRunner {

	@Autowired
	private FieldRepo repository;

	public static void main(String[] args) {
		SpringApplication.run(SurveyMonkeyApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		// save a couple of customers
		repository.save(new TextField("Alice", "Smith"));
		repository.save(new TextField("ditch", "bick"));


		// fetch all customers
		System.out.println("Customers found with findAll():");
		System.out.println("-------------------------------");
		for (TextField customer : repository.findAll()) {
			System.out.println(customer);
		}
		System.out.println();



	}

}
