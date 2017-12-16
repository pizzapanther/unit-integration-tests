from django.test import TestCase, RequestFactory
from rest_framework.response import Response

from yoda_speak.views import google_endpoint



class BlogTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_google_connect(self):
        data = {'user': {'userId': 'ABwppHEYwLjQXDcx9YmF44-UD84xoUZL17SbagHsoEfx7gq1Ay3wMP0hgtEF11LU2yIQGajtosPoPCP4A7bA', 'locale': 'en-US', 'lastSeen': '2017-12-14T20:15:54Z'}, 'conversation': {'conversationId': '1513283096415', 'type': 'NEW'}, 'inputs': [{'intent': 'actions.intent.TEXT', 'rawInputs': [{'inputType': 'VOICE', 'query': 'hi yoda'}], 'arguments': [{'name': 'text', 'rawText': 'hi yoda', 'textValue': 'hi yoda'}]}], 'surface': {'capabilities': [{'name': 'actions.capability.AUDIO_OUTPUT'}, {'name': 'actions.capability.MEDIA_RESPONSE_AUDIO'}]}, 'isInSandbox': True, 'availableSurfaces': [{'capabilities': [{'name': 'actions.capability.AUDIO_OUTPUT'}, {'name': 'actions.capability.SCREEN_OUTPUT'}]}]}


        request = self.factory.post(
            '/translate',
            data
        )

        # self.user_id = request.data['user']['userId']
        # self.requested = request.data['inputs'][0]['rawInputs'][0]['query']

        response = google_endpoint(request)
        # self.assertIsNotNone(self.user_id)
        # self.assertIsInstance(requested, str)

        self.assertEqual(response.status_code, 200)
