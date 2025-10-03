class ExplicitParameter:
    def __init__(self, type):
        self._type = type
    
    @property
    def type(self):
        return self._type
    
    def __str__(self):
        a = self.type
        if self.type : 
            type_str = ', '.join(str(t) for t in self.type)
            a = type_str
        return f'Type: {a}'
    
class ImplicitParameter:
    def __init__(self, variables, type):
        self._variables = variables
        self._type = type

    @property
    def variables(self):
        return self._variables
    
    @property
    def type(self):
        return self._type
    
    def __str__(self):
        variables_str = ', '.join(str(v) for v in self.variables)
        a = self.type
        if self.type : 
            type_str = ', '.join(str(t) for t in self.type)
            a = type_str
        return f'Variables: {variables_str}, Type: {a}'

class ExplicitConstructor:
    def __init__(self, name, parameters, type):
        self._name = name
        self._parameters = parameters
        self._type = type

    @property
    def name(self):
        return self._name

    @property
    def parameters(self):
        return self._parameters
    
    @property
    def type(self):
        return self._type
    
    def __str__(self):
        params_str = ', '.join(str(p) for p in self.parameters)
        return f'ExplicitConstructor Name: {self.name}, type: {self.type}\n    Parameters: {params_str}'

class ImplicitConstructor:
    def __init__(self, name, parameters):
        self._name = name
        self._parameters = parameters

    @property
    def name(self):
        return self._name

    @property
    def parameters(self):
        return self._parameters
    
    def __str__(self):
        params_str = ', '.join(str(p) for p in self.parameters)
        return f'ImplicitConstructor Name: {self.name}\n    Parameters: {params_str}'

class NewType:
    def __init__(self, name, typeParameters, implicitConstructors, explicitConstructors):
        self._name = name
        self._typeParameters = typeParameters
        self._implicitConstructors = implicitConstructors
        self._explicitConstructors = explicitConstructors

    @property
    def name(self):
        return self._name
    
    @property
    def typeParameters(self):
        return self._typeParameters
    
    @property
    def implicitConstructors(self):
        return self._implicitConstructors
    
    @property
    def explicitConstructors(self):
        return self._explicitConstructors

    def __str__(self):
        typeParamsStr = '\n  '.join(str(tp) for tp in self.typeParameters)
        implConstructorsStr = '\n  '.join(str(c) for c in self.implicitConstructors)
        explConstructorsStr = '\n  '.join(str(c) for c in self.explicitConstructors)
        return (f'Type Name: {self.name}\n'
                f'Type Parameters:\n  {typeParamsStr}\n'
                f'ImplicitConstructors:\n  {implConstructorsStr}\n'
                f'ExplicitConstructors:\n  {explConstructorsStr}')

class Hypothesis:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name
    
    def __str__(self):
        return f"Hypothesis Name: {self.name}"