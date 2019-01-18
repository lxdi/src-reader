package model.dto.common_mapper;

import model.dto.IEntityById;
import model.dto.IMapper;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public abstract class CommonMapper<E> implements IMapper<Map<String, String>, E> {

    protected abstract IEntityById getEntityById();

    @Override
    public Map<String, String> mapToDto(E entity) {
        Map<String, String> result = new HashMap<>();

        try {
            for (Method m : entity.getClass().getDeclaredMethods()) {
                if (m.getName().startsWith("get")) {
                    Object fromGetter = m.invoke(entity);
                    if(fromGetter!=null) {
                        if (fromGetter instanceof String || fromGetter instanceof Number) {
                            result.put(transformGetterForDto(m.getName()), "" + fromGetter);
                        } else {
                            Method getIdMethod = fromGetter.getClass().getMethod("getId");
                            long id = (long) getIdMethod.invoke(fromGetter);
                            result.put(transformGetterForDto(m.getName()) + "id", "" + id);
                        }
                    }
                }
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }

        return result;
    }

    private String transformGetterForDto(String getter){
        getter = getter.substring(3);
        return Character.toLowerCase(getter.charAt(0)) + getter.substring(1);
    }

    @Override
    public E mapToEntity(Map<String, String> dto) {
        return null;
    }
}
