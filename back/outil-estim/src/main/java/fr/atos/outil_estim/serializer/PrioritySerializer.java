package fr.atos.outil_estim.serializer;

import fr.atos.outil_estim.enums.Priority;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class PrioritySerializer extends JsonSerializer<Priority> {

	@Override
	public void serialize(Priority priority, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
		jsonGenerator.writeString(Priority.toString(priority));
	}
}
