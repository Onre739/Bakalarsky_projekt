from rest_framework import serializers

class ExplicitParameterSerializer(serializers.Serializer):
    type = serializers.ListField(child=serializers.CharField())

class ImplicitParameterSerializer(serializers.Serializer):
    variables = serializers.ListField(child=serializers.CharField())
    type = serializers.ListField(child=serializers.CharField())

class ExplicitConstructorSerializer(serializers.Serializer):
    name = serializers.CharField()
    parameters = ExplicitParameterSerializer(many=True)
    type = serializers.ListField(child=serializers.CharField())

class ImplicitConstructorSerializer(serializers.Serializer):
    name = serializers.CharField()
    parameters = ImplicitParameterSerializer(many=True)

class NewTypeSerializer(serializers.Serializer):
    name = serializers.CharField()
    type_parameters = ExplicitParameterSerializer(many=True)
    explicit_constructors = ExplicitConstructorSerializer(many=True, required=False)
    implicit_constructors = ImplicitConstructorSerializer(many=True, required=False)

class HypothesisSerializer(serializers.Serializer):
    name = serializers.CharField()
