package fr.atos.outil_estim.deserializer;

import fr.atos.outil_estim.enums.State;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class StateDeserializer extends JsonDeserializer<State> {

	@Override
	public State deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
		return State.fromString(p.getText());
	}
}
