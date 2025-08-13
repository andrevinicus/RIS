import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':codigo/unidades')
  async getUnidadesVinculadas(@Param('codigo') codigo: string) {
    return this.usuariosService.getUnidadesVinculadas(codigo);
  }

  // Coloque esta rota antes das rotas com ':id' simples
@Post(':codigo/vincular-unidades')
async vincularUnidades(
  @Param('codigo') codigo: string,
  @Body() unidadesCodigos: string[],   // recebe direto o array de strings
) {
  console.log(`[vincularUnidades] código do usuário: ${codigo}`);
  console.log(`[vincularUnidades] unidades recebidas no body:`, unidadesCodigos);

  return this.usuariosService.vincularUnidades(codigo, unidadesCodigos);
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }

@Post(':codigo/trocar-unidade')
async trocarUnidade(
  @Param('codigo') codigo: string,
  @Body('unidadeId') unidadeId: string,
) {
  const usuarioAtualizado = await this.usuariosService.trocarUnidade(codigo, unidadeId);
  
  // Retorne algo explícito que o frontend pode usar
  return {
    status: 'success',
    message: 'Unidade trocada com sucesso',
    data: usuarioAtualizado,
  };
}

}
