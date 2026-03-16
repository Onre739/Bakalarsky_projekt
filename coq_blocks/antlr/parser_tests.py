import unittest
from antlr.COQMain import process_coq_code

class TestParser(unittest.TestCase):
    def test_simple_inductive(self):
        src = "Inductive nat : Type := | O | S : nat -> nat."
        out = process_coq_code(src)
        self.assertEqual(len(out), 1)
        self.assertEqual(out[0].name, "nat")
        self.assertEqual(len(out[0].constructors), 2)

    def test_polymorphic_list(self):
        src = "Inductive list (A : Type) : Type := | nil : list A | cons : A -> list A -> list A."
        out = process_coq_code(src)
        self.assertEqual(out[0].name, "list")
        self.assertEqual(out[0].type_parameters, ["A"])
        self.assertEqual(len(out[0].constructors), 2)

if __name__ == "__main__":
    unittest.main()
