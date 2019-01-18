package model.dto.common_mapper;

import model.dto.IEntityById;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

public abstract class CommonMapper<E> {

    protected abstract IEntityById getEntityById(long id, Class clazz);

    public Map<String, String> mapToDto(E entity, Map<String, String> result) {
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

    public E mapToEntity(Map<String, String> dto, E entity) {
        try {
            for (Map.Entry<String, String> entry : dto.entrySet()) {
                if (entry.getKey().length() > 2 && entry.getKey().endsWith("id")) {
                    //TODO object
                } else {
                    Class clazz = defineTypeByGetter(entity.getClass(), entry.getKey());
                    if (Number.class.isAssignableFrom(clazz) || clazz.isPrimitive()) {
                        //Number
                        Method setter =  entity.getClass().getMethod(transformToSetter(entry.getKey()), clazz);
                        setter.invoke(entity, Long.parseLong(entry.getValue()));
                    } else {
                        //String
                        Method setter =  entity.getClass().getMethod(transformToSetter(entry.getKey()), clazz);
                        setter.invoke(entity, entry.getValue());
                    }
                }
            }
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        return entity;
    }

    private Class defineTypeByGetter(Class clazz, String field){
        String getter = transformToGetter(field);
        try {
            return clazz.getMethod(getter).getReturnType();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String transformToSetter(String str){
        return "set" + Character.toUpperCase(str.charAt(0)) + str.substring(1);
    }

    private String transformToGetter(String str){
        return "get" + Character.toUpperCase(str.charAt(0)) + str.substring(1);
    }
}
