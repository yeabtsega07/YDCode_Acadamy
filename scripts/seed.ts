const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() { 
    try{
        await database.category.createMany({
            data: [
                {name: "Data Structures and Algorithms"},
                { name : "Machine Learning"},
                { name: "Frontend Development"},
                { name: "Backend Development"},
                { name: "Fullstack Development"},
                {name : "Web Development"},
                {name : "Mobile Development"},
                {name : "Game Development"},
                {name : "Artificial Intelligence"},
                {name : "Cybersecurity"},
                {name : "Cloud Computing"},
                {name : "DevOps"},
                {name : "Data Science"},
                {name : "Computer Science"},
                {name : "Computer Engineering"},
                {name : "Software Engineering"},
                {name : "Information Technology"},
            ]
        });
        console.log("Seeding finished.");
    }
    catch(error){
        console.log("Error seeding the database categories", error);
    }finally{
        await database.$disconnect();

    }
}

main();