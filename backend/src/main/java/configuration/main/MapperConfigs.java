package configuration.main;

import model.dto.common_mapper.CommonMapper;
import model.dto.common_mapper.IEntityById;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Configuration
public class MapperConfigs {

    @Autowired
    IEntityById entityById;

    @Bean
    public CommonMapper commonMapper(){
        return new CommonMapper(entityById);
    }
//
//    @Bean("func_flow_lazy_includes")
//    public Set<String> includesForfuncFlowLazy(){
//        return new HashSet<>(Arrays.asList("id", "function", "parent", "next", "tags"));
//    }

}
