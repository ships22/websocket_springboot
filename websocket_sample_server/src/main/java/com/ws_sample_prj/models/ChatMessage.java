package com.ws_sample_prj.models;

public class ChatMessage {

    private String content;
    private String formLogin;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFormLogin() {
        return formLogin;
    }

    public void setFormLogin(String formLogin) {
        this.formLogin = formLogin;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "content='" + content + '\'' +
                ", formLogin='" + formLogin + '\'' +
                '}';
    }
}
