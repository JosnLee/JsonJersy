package com.wiki.services;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;

import com.wiki.facade.UsersFacade;
import com.wiki.models.Users;

/**
 * User Service.
 * 用户账户相关的服务。
 */
@Path("/users")
public class UserService {
    private UsersFacade usersFacade;
    private UriInfo uriInfo;

    @Inject
    public UserService(UriInfo uriInfo, UsersFacade usersFacade) {
        this.uriInfo = uriInfo;
        this.usersFacade = usersFacade;
    }

    /**
     * 获取所有用户信息。
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getAllUsers() {
        return usersFacade.getAllUsers();
    }

    /**
     * 根据用户Id，获取用户账户信息。
     * @param userId
     * @return
     */
    @GET
    @Path("{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Users getUserById(@PathParam("userId") Integer userId) {
        return usersFacade.getUserInfoById(userId);
    }

//    /**
//     * 修改给定用户的账户信息。
//     * @param userId
//     * @param theUser
//     * @return
//     */
//    @POST
//    @Path("{userId}")
//    @Produces(MediaType.APPLICATION_JSON)
//    @Consumes(MediaType.APPLICATION_JSON)
//    public Users updateUserPassword(@PathParam("userId") String userId, Users theUser) {
//        return usersFacade.updateTheUsersPasswordById(userId, theUser);
//    }

    /**
     * 创建新账户。
     * @param newUser2Save
     * @return
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createNewUser(Users newUser2Save) {
        usersFacade.createNewUser(newUser2Save);
        URI newLocation = uriInfo.getRequestUriBuilder()
                .path(newUser2Save.getUserId().toString()).build();
        return Response.created(newLocation).entity(newUser2Save).build();
    }

    /**
     * 验证用户的用户名、密码。
     * 1、首次用在用户登录的时候。
     * @param users
     * @return
     */
    @Path("/validate")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response validateUser(Users users) {
        Users validatedUser = usersFacade.validateUser(users);
        if(null != validatedUser) {
            return Response.ok(validatedUser).build();
        } else {
            return Response.status(BAD_REQUEST).entity("用户名或密码有错").build();
        }
    }

    /**
     * 判断给定的用户名是否已经被注册。
     * @param username
     * @return
     */
    @Path("/validate/name/{username}")
    @GET
    public Response validateUsernameIsOccupied(@PathParam("username") String username) {
        if(usersFacade.validateUsernameIsOccupied(username)) {
            return Response.status(Response.Status.CONFLICT).entity("用户名已经被注册").build();
        } else {
            return Response.ok().build();
        }
    }

    /**
     * 修改给定用户的账户信息。
     * @param userId
     * @param user2Update
     * @return
     */
    @PUT
    @Path("{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUserPassword(@PathParam("userId") Integer userId, Users user2Update) {
        Users users = usersFacade.updateTheUsersPasswordById(userId, user2Update);
        if(users != null) {
            return Response.ok().entity(users).build();
        } else {
            return Response.status(Response.Status.FORBIDDEN).entity("修改密码失败").build();
        }
    }

    @DELETE
    @Path("{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteUserById(@PathParam("userId") Integer userId) {
        usersFacade.deleteUserById(userId);
        return Response.ok().build();
    }

}