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
    def __init__(self, name, type_parameters, implicit_constructors, explicit_constructors):
        self._name = name
        self._type_parameters = type_parameters
        self._implicit_constructors = implicit_constructors
        self._explicit_constructors = explicit_constructors

    @property
    def name(self):
        return self._name
    
    @property
    def type_parameters(self):
        return self._type_parameters
    
    @property
    def implicit_constructors(self):
        return self._implicit_constructors
    
    @property
    def explicit_constructors(self):
        return self._explicit_constructors

    def __str__(self):
        type_params_str = '\n  '.join(str(tp) for tp in self.type_parameters)
        impl_constructors_str = '\n  '.join(str(c) for c in self.implicit_constructors)
        expl_constructors_str = '\n  '.join(str(c) for c in self.explicit_constructors)
        return (f'Type Name: {self.name}\n'
                f'Type Parameters:\n  {type_params_str}\n'
                f'ImplicitConstructors:\n  {impl_constructors_str}\n'
                f'ExplicitConstructors:\n  {expl_constructors_str}')

class Hypothesis:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name
    
    def __str__(self):
        return f"Hypothesis Name: {self.name}"