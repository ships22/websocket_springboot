package com.ws_sample_prj.controllers;

import com.ws_sample_prj.storage.UserStorage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping(value = "/registration/{userName}")
    public ResponseEntity<Void>register(@PathVariable String userName) {
        System.out.println("user name add request : " + userName);
        try {
             UserStorage.getInstance().setUsers(userName);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}
