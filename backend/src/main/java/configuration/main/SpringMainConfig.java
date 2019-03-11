package configuration.main;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Created by Alexander on 23.02.2018.
 */

@Configuration
@ComponentScan(basePackages = {"configuration.main", "configuration.db", "controllers" , "model", "services"})
@EnableJpaRepositories(basePackages="model.dao")
public class SpringMainConfig {

}
