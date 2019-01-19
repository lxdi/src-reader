package model.dto.common_mapper;

import model.dto.IEntityById;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

public class CommonMapper {

    private IEntityById entityById;

    public CommonMapper(IEntityById entityById){
        this.entityById = entityById;
    }

    public Map<String, Object> mapToDto(Object entity, Map<String, Object> result) {
        for (Method m : entity.getClass().getDeclaredMethods()) {
            if (m.getName().startsWith("get")) {
                mapFromMethod(entity, result, m);
            }
        }
        return result;
    }

    private void mapFromMethod(Object entity, Map<String, Object> result, Method method) {
        try {
            Object fromGetter = method.invoke(entity);
            if (fromGetter != null) {
                if (fromGetter instanceof String || fromGetter instanceof Number) {
                    //Number or String
                    result.put(transformGetterToFieldName(method.getName()), fromGetter);
                } else {
                    if(fromGetter.getClass().isEnum()){
                        //Enum
                        Method valueMethod = fromGetter.getClass().getMethod("value");
                        result.put(transformGetterToFieldName(method.getName()), valueMethod.invoke(fromGetter));
                    } else {
                        //Object
                        Method getIdMethod = fromGetter.getClass().getMethod("getId");
                        long id = (long) getIdMethod.invoke(fromGetter);
                        result.put(transformGetterToFieldName(method.getName()) + "id", id);
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
    }

    public Object mapToEntity(Map<String, Object> dto, Object entity) {
        try {
            for (Map.Entry<String, Object> entry : dto.entrySet()) {
                if (entry.getValue() != null){
                    if (entry.getKey().length() > 2 && entry.getKey().endsWith("id")) {
                        //Object
                        String fieldName = entry.getKey().substring(0, entry.getKey().length() - 2);
                        Class clazz = defineTypeByGetter(entity.getClass(), fieldName);
                        if(clazz!=null){
                            Method setter = entity.getClass().getMethod(transformToSetter(fieldName), clazz);
                            setter.invoke(entity,
                                    entityById.get(Long.parseLong("" + entry.getValue()), clazz));
                        }
                    } else {
                        Class clazz = defineTypeByGetter(entity.getClass(), entry.getKey());
                        if (clazz != null) {
                            mapToEntityBasicTypes(dto, entity, entry, clazz);
                        }
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

    private void mapToEntityBasicTypes(Map<String, Object> dto, Object entity, Map.Entry<String, Object> entry, Class clazz) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        if (Number.class.isAssignableFrom(clazz) || clazz.isPrimitive()) {
            //Number
            Method setter = entity.getClass().getMethod(transformToSetter(entry.getKey()), clazz);
            setter.invoke(entity, Long.parseLong((String) entry.getValue()));
        } else {
            if(clazz.isEnum()){
                //Enum
                Method setter = entity.getClass().getMethod(transformToSetter(entry.getKey()), clazz);
                setter.invoke(entity, getEnumVal((String) entry.getValue(), clazz));
            } else {
                //String
                Method setter = entity.getClass().getMethod(transformToSetter(entry.getKey()), clazz);
                setter.invoke(entity, entry.getValue());
            }
        }
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

    private String transformGetterToFieldName(String getter){
        getter = getter.substring(3);
        return Character.toLowerCase(getter.charAt(0)) + getter.substring(1);
    }

    private String transformToSetter(String str){
        return "set" + Character.toUpperCase(str.charAt(0)) + str.substring(1);
    }

    private String transformToGetter(String str){
        return "get" + Character.toUpperCase(str.charAt(0)) + str.substring(1);
    }


    public static Object getEnumVal(String stringval, Class enumClass) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Method valueMethod = enumClass.getMethod("value");
        Method valuesMethod = enumClass.getMethod("values");
        for(Object enumVal : (Object[]) valuesMethod.invoke(enumClass)){
            if(valueMethod.invoke(enumVal).equals(stringval)){
                return enumVal;
            }
        }
        return null;
    }

}
