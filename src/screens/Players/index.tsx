import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Alert, FlatList, Keyboard, TextInput } from "react-native";

import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playersGetByGroup } from "@storage/players/playersGetByGroup";
import { playersGetByGroupAndTeam } from "@storage/players/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";

import { ButtonIcon } from "@components/ButtonIcon";
import { Form } from "@components/ButtonIcon/styles";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { HeaderList, NumbersOfPlayers } from "@components/Filter/styles";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container } from "./styles";
import { playerRemoveBtGroup } from "@storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

interface PlayersProps { }


interface RouteParams {
    group: string
}

export function Players({ ...rest }: PlayersProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const newPlayerNameInputRef = useRef<TextInput>(null)

    const navigation = useNavigation()
    const route = useRoute()
    const { group } = route.params as RouteParams

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();
            Keyboard.dismiss()
            setNewPlayerName("")
            fetchPlayersByTeam()

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true)

            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam)

        } catch (error) {

            console.log(error);
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await playerRemoveBtGroup(playerName, group)
            fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            Alert.alert('Remover pessoa', 'Não foi possível remover essas pessoa.')
        }
    }

    async function removeGroup() {
        try {
            await groupRemoveByName(group)
            navigation.navigate('group')
        } catch (error) {
            console.log(error)
            Alert.alert('Remover grupo', 'Não foi possível remover esse grupo.')
        }
    }

    async function handleRemoveGroup() {
        Alert.alert('Remover', 'Deseja remover o grupo?',
            [
                {
                    text: 'Não',
                    style: 'cancel'
                }, {
                    text: 'Sim',
                    onPress: () => removeGroup()
                }
            ])
    }

    useEffect(() => {

        fetchPlayersByTeam()
    }, [team])

    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group} subtitle={"Adicione a galera e separe os times"} />
            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType='done'
                />
                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />

            </Form>
            <HeaderList>

                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() =>
                                setTeam(item)
                            }
                        />
                    )}
                    horizontal
                />
                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>

            {isLoading ? <Loading /> :
                <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <PlayerCard
                            name={item.name}
                            onRemove={() => handlePlayerRemove(item.name)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty message={'Não há jogadores nesse time'} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && { flex: 1 }
                    ]}
                />
            }
            <Button
                title={"Remover Turma"}
                type='SECONDARY'
                onPress={handleRemoveGroup}
            />


        </Container>
    )

}