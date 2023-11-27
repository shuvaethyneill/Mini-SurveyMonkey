package org.MiniSurveyMonkey;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Class to represent a user
 */
@Document("user")
public class User {
    @Id
    private String id;

    private String username;

    /**
     * Constructor for user with provided username
     * @param username
     */
    public User(String username){this.username = username;}

    /**
     * Default constructor for User
     */
    public User(){
        this("");
    }

    /**
     * Method to get the id
     * @return
     */
    public String getId() {return id;}

    /**
     * Method to get the username of the user
     * @return
     */
    public String getUsername() {return username;}

    /**
     * Method to set the id
     * @param id
     */
    public void setId(String id) {this.id = id;}

    /**
     * Method to set the username of the user
     * @param username
     */
    public void setUsername(String username) {this.username = username;}

    /**
     * Overridden toString method to represent a user
     * @return
     */
    @Override
    public String toString(){
        return "{username:" + this.username +"}";
    }
}
