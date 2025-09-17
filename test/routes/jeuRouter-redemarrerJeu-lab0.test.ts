// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
    await request.post('/api/v1/jeu/creerJoueur').send({ nom: 'Joueur1' }).set('Accept', 'application/json');
    await request.post('/api/v1/jeu/creerJoueur').send({ nom: 'Joueur2' }).set('Accept', 'application/json');
  });

  it('devrait retourner 200 et du JSON lors du redémarrage du jeu (succès)', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu').set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  it('Il ne devrait plus y avoir de joueurs', async () => {
    const response = await request.get('/api/v1/jeu/joueurs').set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toBeArrayOfSize(0);
  });

});



