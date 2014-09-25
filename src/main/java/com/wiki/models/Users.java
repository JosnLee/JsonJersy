package com.wiki.models;

import com.wiki.utils.SHA1Encode;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "USERS")
@XmlRootElement
public class Users {
    /**
     * 用户主键
     */
    @Id
    @Column(name = "USER_ID")
    private Integer userId;

    /**
     * 用户登录名
     */
    @Column(name = "USERNAME")
    private String username;

    /**
     * 密码
     */
    @Column(name = "PASSWORD")
    private String password;

    @Transient
    private String formerPassword;

    @Transient
    private String newPassword;

    public Users() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFormerPassword() {
        return formerPassword;
    }

    /**
     * 对密码进行加密处理。
     * @return
     */
    @XmlTransient
    public String getFormerPasswordEncoded() {
        this.formerPassword = SHA1Encode.SHA1(this.formerPassword);
        return this.formerPassword;
    }

    public void setFormerPassword(String formerPassword) {
        this.formerPassword = formerPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    /**
     * 对密码进行加密处理。
     * @return
     */
    @XmlTransient
    public String getNewPasswordEncoded() {
        this.newPassword = SHA1Encode.SHA1(this.newPassword);
        return this.newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    /**
     * 对密码进行加密处理。
     * @return
     */
    @XmlTransient
    public String getPasswordEncoded() {
        this.password = SHA1Encode.SHA1(this.password);
        return this.password;
    }
}