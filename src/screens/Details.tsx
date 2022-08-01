import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, Text, VStack, useTheme, ScrollView, Box } from 'native-base'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { OrderProps } from '../components/Order'
import firestore from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO'
import { dateFormat } from '../utils/firestoresDateFormat'
import { Alert } from 'react-native'
import { Loading } from '../components/Loading'
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
  ClipboardText
} from 'phosphor-react-native'
import { CardDetails } from '../components/CardsDetails'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

type RouteParams = {
  orderId: string
}

type OrderDetails = OrderProps & {
  description: string
  solution: string
  closed: string
}

export default function Details() {
  const [solution, setSolution] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)

  const route = useRoute()
  const { orderId } = route.params as RouteParams

  const { colors } = useTheme()

  const navigation = useNavigation();

  function handleOrderClose(){
    if(!solution){
      return Alert.alert('Solicitação', 'Informa a solução para encerrar a solicitação');
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(()=> {
      Alert.alert('Solicitação', 'Solicitação encerrada');
      navigation.goBack();
    })
    .catch((error)=> {
      console.log(error);
      Alert.alert("Solicitação", "Não foi possível encerrar a solicitação");
    })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution
        } = doc.data()

        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })

        setIsLoading(false)
      })
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} py={3} bg="gray.700">
      <Header p={6} title="Solicitação" />


      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        ></Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails
          title="Descrição"
          description={order.description}
          icon={ClipboardText}
        />
        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {
            order.status === 'open' &&
                      <Input
                      placeholder="Descrição da solução"
                      onChangeText={setSolution}
                      h={24}
                      textAlignVertical="top"
                      multiline
                    />
          }

        </CardDetails>
      </ScrollView>

      {!order.closed && <Button title="Encerrar solicitação" m={5} onPress={handleOrderClose}/>}
    </VStack>
  )
}
