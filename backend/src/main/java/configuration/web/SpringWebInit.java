package configuration.web;

import configuration.db.HibernateConfig;
import configuration.main.SpringMainConfig;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;


/**
 * Created by Alexander on 23.02.2018.
 */

public class SpringWebInit implements WebApplicationInitializer {
	@Override
	public void onStartup(ServletContext container) throws ServletException {
		AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
		ctx.register(SpringMainConfig.class);
		ctx.register(SpringWebConfig.class);
		//ctx.register(HibernateConfig.class);
		ctx.setServletContext(container);

		ServletRegistration.Dynamic servlet = container.addServlet("dispatcher", new DispatcherServlet(ctx));
		servlet.setAsyncSupported(true);
		servlet.setLoadOnStartup(1);
		servlet.addMapping("/");
	}
}
