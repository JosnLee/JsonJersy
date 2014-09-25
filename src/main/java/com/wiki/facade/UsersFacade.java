package com.wiki.facade;

import com.google.inject.Inject;
import com.wiki.models.Users;
import com.google.inject.persist.Transactional;

import java.util.List;

/**
 * UsersFacade.
 * 使用JPA的API，对用户账户信息进行数据操作。
 */
public class UsersFacade extends BaseFacade{
    /**
     * 创建新的用户账户。
     * @param newUser2Save
     * @return
     */
    @Transactional
    public Users createNewUser(Users newUser2Save) {
        Long userNum=entityManager.createQuery("select count(u) from Users u ",Long.class).getSingleResult();
        newUser2Save.setUserId(userNum.intValue()+1);
        newUser2Save.getPasswordEncoded();//对密码进行加密处理

        entityManager.merge(newUser2Save);
        return newUser2Save;
    }

    /**
     * 修改指定ID的用户的账户信息。
     * @param userId
     * @param theUser
     * @return
     */
    @Transactional
    public Users updateTheUsersPasswordById(Integer userId, Users theUser) {
        Users formerUser = entityManager.find(Users.class, userId);
        if(formerUser != null && formerUser.getPassword().equals(theUser.getFormerPasswordEncoded())) {
            formerUser.setPassword(theUser.getNewPasswordEncoded());
            return formerUser;
        }
        return null;
    }

    /**
     * 根据给定的用户的ID，获取用户信息。
     * @param userId
     * @return
     */
    public Users getUserInfoById(Integer userId) {
        return entityManager.find(Users.class, userId);
    }

    /**
     * 校验用户
     * @param user
     * @return
     */
    public Users validateUser(Users user) {
        List<Users> userses = entityManager.createQuery("select u from Users u where u.username = ?1 and u.password = ?2").setParameter(1, user.getUsername()).setParameter(2, user.getPasswordEncoded()).getResultList();
        if(userses.isEmpty()) {
            return null;
        } else {
            return userses.get(0);
        }
    }

    /**
     * 用户名是否已经被注册。
     * @param username
     * @return
     */
    public boolean validateUsernameIsOccupied(String username) {
        return entityManager.createQuery("select u from Users u where u.username = ?1 ").setParameter(1, username).getResultList().size() == 1;
    }

    @Transactional
    public void deleteUserById(Integer userId) {
        entityManager.remove(entityManager.find(Users.class, userId));
    }

    public List<Users> getAllUsers() {
        return entityManager.createQuery("select u from Users u").getResultList();
    }
}
