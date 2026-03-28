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

    def test_empty_input(self):
        # Expect an exception to be raised for empty input
        with self.assertRaises(Exception):
            process_coq_code("")

    def test_multiple_definitions(self):
        # More definitions in one input
        src = """
        Inductive bool : Type := | true | false.
        Inductive nat : Type := | O | S : nat -> nat.
        """
        out = process_coq_code(src)
        self.assertEqual(len(out), 2)
        self.assertEqual(out[0].name, "bool")
        self.assertEqual(out[1].name, "nat")

    def test_empty_type(self):
        # Expect an exception for an inductive type with no constructors
        src = "Inductive empty : Type := ."
        with self.assertRaises(Exception):
            process_coq_code(src)

    def test_invalid_syntax(self):
        # Expect an exception for invalid Coq syntax
        src = "Inductive spatny_zapis -> | : Type"
        with self.assertRaises(Exception):
            process_coq_code(src)
    
if __name__ == "__main__":
    unittest.main()
