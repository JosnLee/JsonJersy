package com.wiki.module;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: WongJohn
 * Date: 14-6-9
 * Time: 下午4:37
 * To change this template use File | Settings | File Templates.
 */
public class WikiCorsFilter  implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        servletResponse.setCharacterEncoding("UTF-8");

        HttpServletResponse res = (HttpServletResponse) servletResponse;
        res.addHeader("Access-Control-Allow-Origin", "*");
        res.addHeader("Allow-Control-Allow-Methods", "POST,GET,OPTIONS");
        res.addHeader("Access-Control-Allow-Credentials", "true");
        res.addHeader("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
        res.addHeader("Access-Control-Max-Age", "600000");
        res.setCharacterEncoding("UTF-8");

        filterChain.doFilter(servletRequest, res);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void destroy() {
    }

}