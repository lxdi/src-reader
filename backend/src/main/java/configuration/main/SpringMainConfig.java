package configuration.main;

import model.dto.common_mapper.CommonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * Created by Alexander on 23.02.2018.
 */

@Configuration
@ComponentScan(basePackages = {"configuration.main", "configuration.db", "controllers" , "model", "services"})
@EnableJpaRepositories(basePackages="model.dao")
public class SpringMainConfig {

}
