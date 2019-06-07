class StateFunction:

    def __init__(self, init_state, **state_func):
        self.func_dict = state_func
        self.set_state(init_state)
    
    def __call__(self):
        self.func()

    def set_state(self, state):
        self.state = state
        self.func = self.func_dict[state]
