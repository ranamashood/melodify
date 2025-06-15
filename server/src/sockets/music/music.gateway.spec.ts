import { Test, TestingModule } from '@nestjs/testing';
import { MusicGateway } from './music.gateway';
import { MusicService } from './music.service';

describe('MusicGateway', () => {
  let gateway: MusicGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicGateway, MusicService],
    }).compile();

    gateway = module.get<MusicGateway>(MusicGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
