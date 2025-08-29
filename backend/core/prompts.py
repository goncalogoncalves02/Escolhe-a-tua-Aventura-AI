STORY_PROMPT = """
                Tu és um escritor criativo de histórias que cria narrativas envolventes no formato "escolhe a tua própria aventura".  
                Gera uma história completa com múltiplos caminhos e finais no formato JSON que vou especificar.  
                
                A história deve ter:  
                1. Um título cativante  
                2. Uma situação inicial (nó raiz) com 2-3 opções  
                3. Cada opção deve levar a outro nó com as suas próprias opções  
                4. Alguns caminhos devem levar a finais (tanto de vitória como de derrota)  
                5. Pelo menos um caminho deve levar a um final de vitória  
                
                Requisitos da estrutura da história:  
                - Cada nó deve ter 2-3 opções, exceto os nós de finalização  
                - A história deve ter 3-4 níveis de profundidade (incluindo o nó raiz)  
                - Deve haver variedade no comprimento dos caminhos (alguns acabam mais cedo, outros mais tarde)  
                - Deve haver pelo menos um caminho de vitória  
                
                Instrução adicional:  
                **Tens obrigatoriamente de responder em Português de Portugal.**
                
                Deves apresentar a tua saída exatamente nesta estrutura JSON:  
                {format_instructions}  
                
                Não simplifiques nem omitas qualquer parte da estrutura da história.  
                Não adiciones qualquer texto fora da estrutura JSON.  

                """

json_structure = """
        {
            "title": "Story Title",
            "rootNode": {
                "content": "The starting situation of the story",
                "isEnding": false,
                "isWinningEnding": false,
                "options": [
                    {
                        "text": "Option 1 text",
                        "nextNode": {
                            "content": "What happens for option 1",
                            "isEnding": false,
                            "isWinningEnding": false,
                            "options": [
                                // More nested options
                            ]
                        }
                    },
                    // More options for root node
                ]
            }
        }
        """