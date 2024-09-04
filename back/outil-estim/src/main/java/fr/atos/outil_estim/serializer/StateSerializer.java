package fr.atos.outil_estim.serializer;

import fr.atos.outil_estim.enums.State;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class StateSerializer extends JsonSerializer<State> {

	@Override
	public void serialize(State state, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
		jsonGenerator.writeString(State.toString(state));
	}
}
