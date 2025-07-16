export const useNewsletter = () => {
  const subscribeToNewsletter = async (email: string) => {
    try {
      const response = await $fetch('/api/newsletter/subscribe', {
        method: 'POST',
        body: { email }
      })
      
      return response
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      throw error
    }
  }

  const unsubscribeFromNewsletter = async (email: string, token?: string) => {
    try {
      const response = await $fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        body: { email, token }
      })
      
      return response
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error)
      throw error
    }
  }

  return {
    subscribeToNewsletter,
    unsubscribeFromNewsletter
  }
}