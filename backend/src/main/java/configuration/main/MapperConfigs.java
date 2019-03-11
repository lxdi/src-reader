package configuration.main;

import com.sogoodlabs.common_mapper.CommonMapper;
import com.sogoodlabs.common_mapper.IEntityById;
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
//
//    @Bean("func_flow_lazy_includes")
//    public Set<String> includesForfuncFlowLazy(){
//        return new HashSet<>(Arrays.asList("id", "function", "parent", "next", "tags"));
//    }

}
