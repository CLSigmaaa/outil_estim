package fr.atos.outil_estim.utils;

import fr.atos.outil_estim.entities.Ensemble;
import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.UserStory;
import fr.atos.outil_estim.enums.ItemType;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DatabindContext;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.jsontype.impl.TypeIdResolverBase;

public class ItemTypeResolver extends TypeIdResolverBase {
	private JavaType superType;

	@Override
	public void init(JavaType baseType) {
		superType = baseType;
	}

	@Override
	public String idFromValue(Object value) {
		return null;
	}

	@Override
	public String idFromValueAndType(Object value, Class<?> suggestedType) {
		return null;
	}

	@Override
	public JsonTypeInfo.Id getMechanism() {
		return null;
	}
	@Override
	public JavaType typeFromId(DatabindContext context, String type) throws IOException {
		ItemType itemType = ItemType.fromString(type);

		return switch (itemType) {
			case US -> context.constructSpecializedType(superType, UserStory.class);
			case SPRINT -> context.constructSpecializedType(superType, Sprint.class);
			case ENSEMBLE ->  context.constructSpecializedType(superType, Ensemble.class);
		};
	}
	}
