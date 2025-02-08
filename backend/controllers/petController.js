import asyncHandler from "express-async-handler";
import Pet from "../models/petModel.js";
import generateToken from '../utils/generateToken.js' // Assuming you have this utility function

// @desc    Create a new pet
// @route   POST /api/pets
// @access  Private
const createPet = asyncHandler(async (req, res) => {
  try {
    const { name, type, breed, age, gender, notes, image } = req.body;

    if (!name || !type || !breed || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled."
      });
    }

    const pet = new Pet({
      user: req.user._id,
      name,
      type,
      breed,
      age,
      gender,
      notes,
      image,
    });

    const createdPet = await pet.save();
    res.status(201).json({
      success: true,
      message: "Pet created successfully.",
      data: createdPet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the pet.",
      error: error.message
    });
  }
});

// @desc    Get all pets
// @route   GET /api/pets
// @access  Public
const getPets = asyncHandler(async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).json({
      success: true,
      message: "Displaying all Pets",
      data: pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving pets.",
      error: error.message
    });
  }
});

// @desc    Get a single pet by ID
// @route   GET /api/pets/:id
// @access  Public
const getPetById = asyncHandler(async (req, res) => {
  try {
    // Attempt to find the pet by ID
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      res.status(200).json({
        success: true,
        message: "Pet retrieved successfully.",
        data: pet,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Pet not found. Please check the ID and try again.",
      });
    }
  } catch (err) {
    console.error("Error retrieving pet:", err.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the pet.",
      error: err.message,
    });
  }
});


// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Private
const updatePet = asyncHandler(async (req, res) => {
  try {
    const { name, type, breed, age, gender, notes } = req.body;

    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found."
      });
    }

    if (pet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this pet."
      });
    }

    pet.name = name || pet.name;
    pet.type = type || pet.type;
    pet.breed = breed || pet.breed;
    pet.age = age || pet.age;
    pet.gender = gender || pet.gender;
    pet.notes = notes || pet.notes;

    const updatedPet = await pet.save();
    res.status(200).json({
      success: true,
      message: "Pet updated successfully.",
      data: updatedPet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the pet.",
      error: error.message
    });
  }
});

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
// @access  Private
const deletePet = asyncHandler(async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found."
      });
    }

    if (pet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this pet."
      });
    }

    await pet.deleteOne();
    res.status(200).json({
      success: true,
      message: "Pet Deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the pet.",
      error: error.message
    });
  }
});

// @desc    Get vaccination records for a pet
// @route   GET /api/pets/:id/vaccination-records
// @access  Private
const getVaccinationRecords = asyncHandler(async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found."
      });
    }

    if (pet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access vaccination records."
      });
    }

    res.status(200).json({
      success: true,
      message: "Vaccination records retrieved successfully.",
      data: pet.vaccinationRecords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving vaccination records.",
      error: error.message
    });
  }
});

export {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
  getVaccinationRecords,
};
