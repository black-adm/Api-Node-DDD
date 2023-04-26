import { InMemoryChallengesRepository } from "../../../tests/repositories/inMemoryChallengesRepository";
import { InMemoryStudentsRepository } from "../../../tests/repositories/inMemoryStudentsRepository";
import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";
import { CreateChallengeSubmission } from "./createChallengeSubmission"

describe('Criar caso de uso de envio do desafio', () => {
  it('Deve ser capaz de criar um novo envio de desafio', async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const challengesRepository = new InMemoryChallengesRepository();

    const student = Student.create({
      name: 'Matheus Roberto',
      email: 'matheusroberto@gmail.com',
    })

    const challenge = Challenge.create({
      title: 'Challenge - 01',
      instructionsUrl: 'http://example.com',
    })

    studentsRepository.items.push(student);
    challengesRepository.items.push(challenge);

    const sut = new CreateChallengeSubmission(
      studentsRepository,
      challengesRepository
    );

    const response = await sut.execute({
      studentId: student.id,
      challengeId: challenge.id
    })

    expect(response).toBeTruthy()
  });
});