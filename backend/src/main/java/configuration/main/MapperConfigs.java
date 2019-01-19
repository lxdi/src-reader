package configuration.main;

import model.dto.common_mapper.CommonMapper;
import model.dto.common_mapper.IEntityById;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfigs {

    @Autowired
    IEntityById entityById;

    @Bean
    public CommonMapper commonMapper(){
        return new CommonMapper(entityById);
    }

}
