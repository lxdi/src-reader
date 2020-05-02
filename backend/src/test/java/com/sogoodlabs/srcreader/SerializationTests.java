package com.sogoodlabs.srcreader;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static junit.framework.TestCase.assertTrue;

public class SerializationTests {

    @Test
    public void serializaionTest() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> testObj = new HashMap<>();
        testObj.put("id", "1");
        testObj.put("title", "test title");

        String result = objectMapper.writeValueAsString(testObj);

        assertTrue(result.contains("1"));
        assertTrue(result.contains("test title"));
        assertTrue(result.equals("{\"id\":\"1\",\"title\":\"test title\"}"));
    }

    @Test
    public void deserializeTest() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String json = "{ \"color\" : \"Black\", \"type\" : \"BMW\" }";
        Map testObj = objectMapper.readValue(json, Map.class);

        assertTrue(testObj.get("color").equals("Black"));
    }

    @Test
    public void deepDeserialization() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String json = "{ \"color\" : \"Black\", \"inner val\":{\"test val name\":\"val1\"}, \"inner arr\":[\"arr val1\", \"arr val2\"]}";
        Map testObj = objectMapper.readValue(json, Map.class);

        assertTrue(testObj.get("color").equals("Black"));
        assertTrue(((Map)testObj.get("inner val")).get("test val name").equals("val1"));
        assertTrue(((List)testObj.get("inner arr")).get(0).equals("arr val1"));
    }

}
