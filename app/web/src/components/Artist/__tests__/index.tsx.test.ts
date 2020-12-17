import Artist from '@/components/Artist'
import assert from 'power-assert'
import sinon from 'sinon'

it('calculates random value from min to max', (): void => {
  sinon.stub(Math, 'random').returns(0.5)
  const number = Artist.Math.rand(5, 10)
  assert(number === 7)
})
