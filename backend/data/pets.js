const pets = [
  {
    name: "Shadow",
    type: "Dog",
    breed: "German Shepherd",
    age: 5,
    gender: "Male",
    vaccinationRecords: [
      {
        vaccineName: "Rabies",
        dateAdministered: new Date("2023-09-10"),
        nextDueDate: new Date("2024-09-10"),
      },
      {
        vaccineName: "Distemper",
        dateAdministered: new Date("2023-08-05"),
        nextDueDate: new Date("2024-08-05"),
      },
      {
        vaccineName: "Parvovirus",
        dateAdministered: new Date("2023-07-01"),
        nextDueDate: new Date("2024-07-01"),
      },
    ],
    isNeutered: true,
    notes:
      "Highly intelligent and energetic, loves obedience training and playing fetch.",
    petImage: "/images/shepherd.jpg", // Replace with the actual image URL or path
  },

  {
    name: "Bella",
    type: "Dog",
    breed: "Labrador Retriever",
    age: 2,
    gender: "Male",
    vaccinationRecords: [
      {
        vaccineName: "Rabies",
        dateAdministered: new Date("2023-10-05"),
        nextDueDate: new Date("2024-10-05"),
      },
      {
        vaccineName: "Distemper",
        dateAdministered: new Date("2023-09-01"),
        nextDueDate: new Date("2024-09-01"),
      },
      {
        vaccineName: "Parvovirus",
        dateAdministered: new Date("2023-08-20"),
        nextDueDate: new Date("2024-08-20"),
      },
    ],
    isNeutered: true,
    notes: "Friendly and outgoing, loves swimming and playing fetch.",
    petImage: "/images/labrodor.jpg", // Replace with the actual image URL or path
  },

  {
    name: "Max",
    type: "Cat",
    breed: "Maine Coon",
    age: 3,
    gender: "Female",
    vaccinationRecords: [
      {
        vaccineName: "Rabies",
        dateAdministered: new Date("2023-09-12"),
        nextDueDate: new Date("2024-09-12"),
      },
      {
        vaccineName: "Feline Distemper",
        dateAdministered: new Date("2023-08-15"),
        nextDueDate: new Date("2024-08-15"),
      },
      {
        vaccineName: "Feline Leukemia",
        dateAdministered: new Date("2023-07-10"),
        nextDueDate: new Date("2024-07-10"),
      },
    ],
    isNeutered: true,
    notes:
      "Gentle and affectionate, enjoys lounging by windows and playing with feather toys.",
    petImage: "/images/max.jpg", // Replace with the actual image URL or path
  },

  {
    name: "Milo",
    type: "Cat",
    breed: "Siamese",
    age: 2,
    gender: "Female",
    vaccinationRecords: [
      {
        vaccineName: "Rabies",
        dateAdministered: new Date("2023-11-01"),
        nextDueDate: new Date("2024-11-01"),
      },
      {
        vaccineName: "Feline Distemper",
        dateAdministered: new Date("2023-10-10"),
        nextDueDate: new Date("2024-10-10"),
      },
      {
        vaccineName: "Feline Herpesvirus",
        dateAdministered: new Date("2023-09-20"),
        nextDueDate: new Date("2024-09-20"),
      },
    ],
    isNeutered: true,
    notes:
      "Very vocal and loves attention. Enjoys climbing and playing with interactive toys.",
    petImage: "/images/milo.jpg", // Replace with the actual image URL or path
  },

  {
    name: "Luna",
    type: "Cat",
    breed: "Sphynx",
    age: 4,
    gender: "Female",
    vaccinationRecords: [
      {
        vaccineName: "Rabies",
        dateAdministered: new Date("2023-03-10"),
        nextDueDate: new Date("2024-03-10"),
      },
      {
        vaccineName: "Feline Distemper",
        dateAdministered: new Date("2023-02-15"),
        nextDueDate: new Date("2024-02-15"),
      },
      {
        vaccineName: "Feline Calicivirus",
        dateAdministered: new Date("2023-01-25"),
        nextDueDate: new Date("2024-01-25"),
      },
    ],
    isNeutered: true,
    notes:
      "Affectionate and curious, enjoys warmth and cuddles. Needs regular skin care due to lack of fur.",
    petImage: "/images/sphynx.jpg", // Replace with the actual image URL or path
  },

  {
    name: "Prince",
    type: "Dog",
    breed: "Rottweiler",
    age: 4,
    gender: "Male",
    vaccinationRecords: [
      {
        vaccineName: "Rabies",
        dateAdministered: new Date("2023-06-20"),
        nextDueDate: new Date("2024-06-20"),
      },
      {
        vaccineName: "Distemper",
        dateAdministered: new Date("2023-05-15"),
        nextDueDate: new Date("2024-05-15"),
      },
    ],
    isNeutered: false,
    notes: "Loyal and protective, enjoys long walks and training sessions.",
    petImage: "/images/Rottweiler.jpg", // Replace with the actual image URL or path
  },
];

export default pets;
